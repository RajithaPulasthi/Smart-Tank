export const loginUser = async (credentials: { userName: string; password: string }) => {
    const res = await fetch("http://localhost:8080/api/Authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    if (!res.ok) throw new Error("Invalid login");
    return res.json();
  };
  