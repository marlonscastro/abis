import axios from "axios";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { ILog } from "../interfaces/Log";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'test') return next()
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")
    const { lat, lon } = req.headers
    if (token[0] === 'Bearer') {
      let payload: any = null
      try {
        payload = jwt.verify(token[1], process.env.AUTH_SECRET)
      } catch (error) {
        return res.status(401).json({ message: 'JWT =>' + error.message })
      }
      let sistemas = payload.sistemas as Array<number>

      if (sistemas) {
        if (req.baseUrl === '/wsCivil') {
          if (!sistemas.find(s => s === 2)) {
            return res.status(403).json({ message: 'usuário não possui acesso à busca civil!' })
          }
        }
        else {
          if (!sistemas.find(s => s === 9)) {
            return res.status(403).json({ message: 'usuário não possui acesso à busca criminal!' })
          }
        }
      }

      let dado = ''
      const param = req.path.split('/')
      if (param[1] === 'ObterDocumentos') {
        dado = JSON.stringify(req.body)
      }
      if (param[1] === 'BuscarCidadaoNominal') {
        dado = JSON.stringify(req.query)
      }
      const logAbis: ILog = {
        CPF: payload.cpf,
        NOME: payload.nome || payload.email,
        BASE: payload.base || 'pm',
        TIPO: req.baseUrl === "/wsCivil" ? "CIVIL" : "CRIMINAL",
        PARAMETRO: param[1] || "",
        DADO: dado === '' ? param[2] : dado,
        RETORNO: '',
        LAT: lat as string || '',
        LON: lon as string || ''
      }
      if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'test') {
        try {
          axios.post(`${process.env.URL_LOG}/abis`, logAbis)
        } catch (error) {
          console.log(error.message)
        }
      }

      return next();
    }
    else return res.status(401).json({ message: 'Token mal formatado!' })
  }
  else {
    return res.status(401).json({ message: 'Token ausente!' })
  }
}

export default authMiddleware;



// Tokem BOEPM OK
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU1VBUklPIjoiNTc5YzM3NjAtNDhkNC00MDExLWFlMzktZGY3MDIyMDViM2RiIiwiZW1haWwiOiJtYXJsb24uY2FzdHJvQHBtLnBlLmdvdi5iciIsImNwZiI6IjA1OTc5NzI0NDM1IiwiaWF0IjoxNjUzMzE2NjMxLCJleHAiOjE2NTM0MDMwMzF9.WP6gC_KpKuBQSxFQunzBzpotWi5MQwAvS2VdX8QCoxc'
// BOEPM token vencido 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU1VBUklPIjoiYjZmYjcyM2UtMzUxOS00OTc2LWI4NmEtYzBhZDVmZjRjZWFiIiwiZW1haWwiOiJyb2RyaWdvLnBhYmxvQHBtLnBlLmdvdi5iciIsImNwZiI6IjAzOTg5NDk1NDk2IiwiaWF0IjoxNjUyNzEwMDY2LCJleHAiOjE2NTI3OTY0NjZ9.2ZB8WDgepS-MDFsyOAfmnjKxvio4RFvhVDw0dTTjB_M'
// token policia agil  ok 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiIwNTk3OTcyNDQzNSIsIm5vbWUiOiJNQVJMT04gREUgTElNQSBDQVNUUk8iLCJlbWFpbCI6Im1hcmxvbi5jYXN0cm9AcG0ucGUuZ292LmJyIiwiYmFzZSI6InBtIiwiaWRfb21lIjo0MTE4LCJvbWUiOiJPRSIsImlkX2FjZXNzbyI6IjIiLCJzaXN0ZW1hcyI6WzEsMiwzLDQsNiw3LDgsOSwxMF0sImlhdCI6MTY1MzMxMzMzNywiZXhwIjoxNjUzMzk5NzM3fQ.5sAcOlkKGjsvVyIXrMuEeT9cSWv3k1RLoKNtU8aXNNo'
// token policia agil expired  
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiIwNTk3OTcyNDQzNSIsIm5vbWUiOiJNQVJMT04gREUgTElNQSBDQVNUUk8iLCJlbWFpbCI6Im1hcmxvbi5jYXN0cm9AcG0ucGUuZ292LmJyIiwiYmFzZSI6InBtIiwiaWRfb21lIjo0MTE4LCJvbWUiOiJPRSIsImlkX2FjZXNzbyI6IjEiLCJzaXN0ZW1hcyI6WzEsMiwzLDQsNiw3LDgsOSwxMF0sImlhdCI6MTY1Mjg5Mzk2MywiZXhwIjoxNjUyOTgwMzYzfQ.cAYj-WZC0hVMqHHBaAdI1l8ZX7-U24ZDLo1xT-l8Cbw'

