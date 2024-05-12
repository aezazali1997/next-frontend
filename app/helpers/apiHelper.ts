export class ApiCaller {
  static loginHandler = async (values) => {
    let res = await fetch("http://localhost:3001/auth/login", {
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
  static registerHandler = async (values) =>{
    let res = await fetch("http://localhost:3001/auth/register", {
      body: this.bodyParser({
        name: values.name,
        email: values.email,
        password:values.password,
        role:'user',
        organizationId:"663f93034fd782466e3abed9",
        addresses:[
          {
          addressLine1:"",
          addressLine2:"",
          state:"",
          city:"",
          country:"",
          role:"",
          shipping:"",
          phoneNo:"",
          }
        ]


      }),
      method: "POST",
      headers: this.getHeaders(),
    })
    if (res.status !== 201) {
      throw new Error(res.statusText);
    }
    return
  };
  static  getUserInfo =async (id:string)=>{
     let res = await fetch(`http://localhost:3001/user/${id}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (res.status === 404) {
      throw new Error(res.statusText);
    }
    let userData = await res.json();
    return userData;
  }


  static getHeaders = () => {
    return {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${localStorage.getItem('token')}`
    };
  };
  static bodyParser = (values) => {
    return JSON.stringify(values);
  };
}
