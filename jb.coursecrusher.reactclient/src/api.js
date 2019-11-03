export default class API {
  constructor(auth) {
    this.endpoint = "https://localhost:44320/api/";
    this.auth = auth;
  }

  async get(resource) {
    return this.request(resource, "GET")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network error, not ok");
      })
      .catch(error => console.log(error.message));
  }

  async post(resource, body) {
    return this.request(resource, "POST", body)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network error, not ok");
      })
      .catch(error => console.log(error.message));
  }

  async put(resource, body) {
    return this.request(resource, "PUT", body)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network error, not ok");
      })
      .catch(error => console.log(error.message));
  }

  async delete(resource) {
    return this.request(resource, "DELETE")
      .then(response => {
        if (response.ok) return response;
        throw new Error("Network error, not ok");
      })
      .catch(error => console.log(error.message));
  }

  async request(resource, method, body) {
    if (method === "POST" || method === "PUT") {
      return fetch(`${this.endpoint}${resource}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.auth}`
        },
        method: method,
        body: JSON.stringify(body)
      });
    } else {
      return fetch(`${this.endpoint}${resource}`, {
        headers: {
          Authorization: `Bearer ${this.auth}`
        },
        method: method
      });
    }
  }
}
