const LoadPortfolio = async (token) => {

  const response = await fetch("/api/portfolio", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  
  return await Promise.resolve(response.json());
};

export default LoadPortfolio;
