const Url = "http://localhost";
const Port = "3001";
export class ApiCaller {
  static getURL = () => {
    return Url + ":" + Port;
  };

  static getHeaders = () => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  };

  static bodyParser = (values) => {
    return JSON.stringify(values);
  };

  static loginHandler = async (values) => {
    let res = await fetch(`${this.getURL()}/auth/login`, {
      body: this.bodyParser({
        email: values.email,
        password: values.password,
      }),
      method: "POST",
      headers: this.getHeaders(),
    });
    if (res.status !== 201) {
      throw new Error(res.statusText);
    }
    let tokenData = await res.json();
    return tokenData;
  };

  static getUserList = async () => {
    let res = await fetch(`${this.getURL()}/user`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (res.status === 404) {
      throw new Error(res.statusText);
    }
    let list = await res.json();
    return list;
  };

  static registerHandler = async (values) => {
    let res = await fetch(`${this.getURL()}/auth/register`, {
      body: this.bodyParser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: "user",
        organizationId: values.organizationId,
        addresses: [
          {
            addressLine1: "",
            addressLine2: "",
            state: "",
            city: "",
            country: "",
            role: "",
            shipping: "",
            phoneNo: "",
          },
        ],
      }),
      method: "POST",
      headers: this.getHeaders(),
    });
    if (res.status !== 201) {
      throw new Error(res.statusText);
    }
    return;
  };

  static getUserInfo = async (id: string) => {
    let res = await fetch(`${this.getURL()}/user/${id}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (res.status === 404) {
      throw new Error(res.statusText);
    }
    let userData = await res.json();
    return userData;
  };

  static removeUserInfo = async (id: string) => {
    let res = await fetch(`${this.getURL()}/user/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (res.status === 404) {
      throw new Error(res.statusText);
    }
    return;
  };

  static updateUserInfo = async (id: string, formData) => {
    let res = await fetch(`${this.getURL()}/user/${id}`, {
      body: this.bodyParser(formData),
      method: "PATCH",
      headers: this.getHeaders(),
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return;
  };

  static getPublicOrganizations = async () => {
    let res = await fetch(`${this.getURL()}/organization/public`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const list = res.json();
    return list;
  };

  static getOrganizationsList = async () => {
    let res = await fetch(`${this.getURL()}/organization`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (res.status === 404) {
      throw new Error(res.statusText);
    }
    let list = await res.json();
    return list;
  };
}
