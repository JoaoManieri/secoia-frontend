import normaInstance from "@/helper/axios-norma";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export const getNormas = async () => {
  try {
    const response = await normaInstance.get();
    const normasComIcone = response.data.map((norma) => ({
      ...norma,
      icone: <AutoStoriesIcon />,
    }));
    return normasComIcone;
  } catch (error) {
    console.error('Erro ao buscar normas:', error);
    throw error;
  }
};

