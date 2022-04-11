export const API_END_POINT = "https://kdt.roto.codes";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return await res.json(); // await를 사용해야 결과값이 return된다.
    }
  } catch (error) {
    console.log(error);
  }
};
