const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const X_USERNAME = "jinist";

export const request = async (url, options) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": X_USERNAME,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }
};
