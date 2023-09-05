import axios from "axios";

type Token = {
  csrfToken: string;
};

export const getToken = async () => {
  const data = new FormData();

  const config = {
    method: "get",
    url: "http://localhost:8000/csrf",
    headers: {
      Cookie: "csrftoken=1xtMb2GprvXcppXJDVKnFwB4qdcaj5Tq",
      "X-CSRFToken": "1xtMb2GprvXcppXJDVKnFwB4qdcaj5Tq",
    },
    data: data,
  };

  const response = await axios(config).then((res) => {
    const token = res.data.csrf_token;
    console.log("token", token);
    localStorage.setItem("csrfToken", token);
    return token as Token;
  });
  return response.data as Token;
};

export const parseInvoice = async (invoice, token) => {
  console.log("invoice", invoice);
  console.log("token", token);
  const config = {
    method: "post",
    url: "http://localhost:8000/test",
    headers: {
      "X-CSRFToken": token,
      Cookie: "csrftoken=1xtMb2GprvXcppXJDVKnFwB4qdcaj5Tq",
      "Content-Type": "multipart/form-data",
    },
    data: invoice,
  };

  const response = await axios(config).catch((err) => {
    console.log("err", err);
  });
  return response;
};
