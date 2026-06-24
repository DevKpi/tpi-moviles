import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  tarea: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  tareaCompletada: {
    backgroundColor: '#b0d4b0',
    textDecorationLine: 'line-through',
  },
  textoTarea: {
    fontSize: 16,
  },

});
