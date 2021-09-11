import RequestTest from '../service/request';
import request from '../service/request';

describe("Integration Test: Users", () => {
  const request = new RequestTest();

  it("Create user not valid, Email already registered in the system", async () => {
    const user = {
      name_user: "teste true",
      email_user: "testuser10@gsail.com",
      password_user: 123456
    }

    const { response } = await request.post("/user/signup", user);
    expect("Email já cadastrado no sistema").toBe(response.message);
    expect(true).toBe(true);
  })

  it("Create valid user", async () => {
    const user = {
      name_user: "teste true",
      email_user: `test${Date.now()}email@gsail.com`,
      password_user: 123456
    }

    const { response } = await request.post("/user/signup", user);
    expect("success").toBe(response.status);
    expect("Usuário cadastrado com sucesso !").toBe(response.message);
  })

  it("Create users with invalid fields, field name empty", async () => {
    const user = {
      name_user: "",
      email_user: "testuser11@gsail.com",
      password_user: 123456
    }
    const { response } = await request.post("/user/signup", user);
    expect("O nome não poder ser vazio.").toBe(response.errors[0]);
  })

  it("Create users with invalid fields, field email empty", async () => {
    const user = {
      name_user: "test user",
      email_user: "",
      password_user: 123456
    }
    const { response } = await request.post("/user/signup", user);
    expect("Email é um campo obrigatório").toBe(response.errors[0]);
  })

  it("Create users with invalid fields, field password empty", async () => {
    const user = {
      name_user: "test user",
      email_user: "jardesson00010@sail.com",
      password_user: ''
    }
    const { response } = await request.post("/user/signup", user);
    expect("Senha deve conter no minimo 6 digitos").toBe(response.errors[0]);
  })

  it("Create users with invalid fields, fields empty", async () => {
    const user = {
      name_user: "",
      email_user: "",
      password_user: ""
    }

    const { response } = await request.post("/user/signup", user);
    expect(4).toBe(response.errors.length);
  })

  // it("user login", async () => {
  //   const user = {
  //     username: "jardessonsribeiro@gmail.com",
  //     password: '123456'
  //   }
  //   const { response } = await request.get("/user/login", {
  //     auth: {
  //       username: "jardessonsribeiro@gmail.com",
  //       password: '123456'
  //     }
  //   });

  // })

})
