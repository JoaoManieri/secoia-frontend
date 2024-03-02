import normaInstance from "@/helper/axios-norma";

const getNormaById = async (id) => {
  try {
    const response = await normaInstance.get("/" + id);
    return response;
  } catch (error) {
    console.error("Erro ao buscar normas:", error);
    throw error;
  }
};

export default getNormaById;
