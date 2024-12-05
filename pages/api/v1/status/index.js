function status(request, response) {
  response.status(200).json({ chave: "O projeto está tomando forma!" });
}

export default status;
