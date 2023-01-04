import { UnauthorizedError, ServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/interfaces'

export const BadRequestException = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const UnauthorizedException = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const ForbidenException = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const ServerErrorException = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const Created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const Ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const NoContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
