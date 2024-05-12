
export class ApiCaller {
  static loginHandler=async(values)=>{

    let res = await fetch('http://localhost:3001/auth/login',
  {
    body: this.bodyParser({
      email:values.email,
      password:values.password
    }),
    method:'POST',
    headers:this.getHeaders()    
  
  });
  let tokenData = await res.json();
  return tokenData;

  }
  static getHeaders =() =>{
    return {
      'Content-Type':"application/json"
    }
  }
  static bodyParser = (values)=>{
    return JSON.stringify(values);
  }

}