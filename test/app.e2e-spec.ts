import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import * as argon2 from "argon2";
import { Db, ObjectId } from "mongodb";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  let db: Db;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    db = app.get("DATABASE_CONNECTION");

    const user = {
      email: "john@gmail.com",
      name: "john",
      password: await argon2.hash("test"),
    };

    const channel = {
      name: "science",
    };

    await db.collection("users").insertOne(user);
    await db.collection("channels").insertOne(channel);

    await app.init();
  });

  async function login(): Promise<string> {
    const mutation = `mutation Login($loginDto: loginDto!) {
      login(loginDto: $loginDto) {
        name
        token
      }
    }`;

    const variables = {
      loginDto: {
        email: "john@gmail.com",
        password: "test",
      },
    };

    const response = await request(app.getHttpServer()).post("/graphql").send({
      query: mutation,
      variables,
    });

    return response.body.data.login.token;
  }

  beforeEach(async () => {});

  afterAll(async () => {
    await app.close();
    await db.collection("users").deleteMany();
    await db.collection("channels").deleteMany();
  });

  describe("auth", () => {
    it("should signup", async () => {
      const mutation = `mutation Signup($signupDto: SignupInput!) {
        signup(signupDto: $signupDto) {
          name
          token
        }
      }`;

      const variables = {
        signupDto: {
          email: "jemmy@gmail.com",
          name: "jemmy",
          password: "test",
          confirmPassword: "test",
        },
      };

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: mutation,
          variables,
        });

      expect(response.body.data.signup.name).toBe(variables.signupDto.name);
      expect(response.status).toBe(200);
    });

    it("should login", async () => {
      const mutation = `mutation Login($loginDto: loginDto!) {
        login(loginDto: $loginDto) {
          name
          token
        }
      }`;

      const variables = {
        loginDto: {
          email: "john@gmail.com",
          password: "test",
        },
      };

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: mutation,
          variables,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.login.name).toBe("john");
    });
  });

  describe("channel", () => {
    it("should create", async () => {
      const mutation = `mutation CreateChannel($createChannelInput: CreateChannelInput!) {
        createChannel(createChannelInput: $createChannelInput) {
          id
        }
      }`;

      const variables = {
        createChannelInput: {
          name: "",
        },
      };

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: mutation,
          variables,
        });
      console.log(response.body.data);

      expect(response.status).toBe(200);
    });
  });

  describe("subscribe", () => {
    it("should subscribe channel", async () => {
      const channel = await db
        .collection("channels")
        .findOne({ name: "science" });

      const token = await login();

      const mutation = `mutation SubscribeChannel($subscribeInput: CreateSubscriptionInput!) {
        subscribeChannel(subscribeInput: $subscribeInput) {
          id
        }
      }`;

      const variables = {
        subscribeInput: {
          channelId: channel._id,
        },
      };

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", token)
        .send({
          query: mutation,
          variables,
        });

      console.log(response.body.data);

      expect(response.status).toBe(200);
    });
  });
});
