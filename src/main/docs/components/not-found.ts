export const notFound = {
  description: 'Recurso não encontrado',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
