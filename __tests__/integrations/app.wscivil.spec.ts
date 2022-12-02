import request from 'supertest';
import app from './app';
import headers from './testsConfig/config';

describe('Teste da rota "/wsCivil/Autenticar"', () => {
  it('Deve retornar o código 200 para credenciais válidas', async () => {
    const response = await request(app)
      .post("/wsCivil/Autenticar")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);

  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {

    const response = await request(app)
      .post("/wsCivil/Autenticar")
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');

    expect(response.status).toBe(401);
  });
});

describe('Teste da rota "/wsCivil/BuscarPorRG"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarPorRG/7620643")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarPorRG/11111111")
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para RG nao encontrado', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarPorRG/12311")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });
  it('Deve retornar o código 400 para RG inválido', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarPorRG/12ww1")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(400);
  });
});

describe('Teste da rota "/wsCivil/BuscarCidadaoPorRG"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarCidadaoPorRG/7620643")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarCidadaoPorRG/11111111")
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para RG nao encontrado', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarCidadaoPorRG/12311")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });
  it('Deve retornar o código 400 para RG inválido', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarCidadaoPorRG/12ww1")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(400);
  });
});

describe('Teste da rota "/wsCivil/BuscarCidadaoPorCPF"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarCidadaoPorCPF/11030869448")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarCidadaoPorCPF/11111111")
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para CPF nao encontrado', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarCidadaoPorCPF/12311")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });
  it('Deve retornar o código 400 para CPF inválido', async () => {
    const response = await request(app)
      .get("/wsCivil/BuscarCidadaoPorCPF/12ww1")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(400);
  });
});

describe('Teste da rota "/wsCivil/ObterDadosCidadaoCivil"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterDadosCidadaoCivil/610406")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterDadosCidadaoCivil/11111111")
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterDadosCidadaoCivil/123110980")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });
  it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterDadosCidadaoCivil/12ww1")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(400);
  });
});

describe('Teste da rota "/wsCivil/ObterDocumentos"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .post("/wsCivil/ObterDocumentos")
      .send({
        v_sMnemonicoSubTipoImagem: "NA",
        v_iPessoa: "7422928"
      })
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .post("/wsCivil/ObterDocumentos")
      .send({})
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
    const response = await request(app)
      .post("/wsCivil/ObterDocumentos")
      .send({
        v_sMnemonicoSubTipoImagem: "NA",
        v_iPessoa: "7422928333"
      })
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });
  it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
    const response = await request(app)
      .post("/wsCivil/ObterDocumentos")
      .send({
        v_sMnemonicoSubTipoImagem: "NA",
        v_iPessoa: "7422928q"
      })
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(400);
  });
});

describe('Teste da rota "/wsCivil/BuscarCidadaoNominal"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .post("/wsCivil/BuscarCidadaoNominal")
      .send({
        v_sNome: "Jonas Gabriel da Silva"
      })
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .post("/wsCivil/BuscarCidadaoNominal")
      .send({
        v_sNome: "Jonas Gabriel da Silva"
      })
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
    const response = await request(app)
      .post("/wsCivil/BuscarCidadaoNominal")
      .send({
        v_sNome: "kkwwww"
      })
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });

});

describe('Teste da rota "/wsCivil/ObterDigitais"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .post("/wsCivil/ObterDigitais")
      .send({
        v_iPessoa: "7422928",
        v_iPosicao: "1"
      })
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .post("/wsCivil/ObterDigitais")
      .send({
        v_iPessoa: "7422928",
        v_iPosicao: "1"
      })
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
    const response = await request(app)
      .post("/wsCivil/ObterDigitais")
      .send({
        v_iPessoa: "7422928222",
        v_iPosicao: "1"
      })
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });
  it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
    const response = await request(app)
      .post("/wsCivil/ObterDigitais")
      .send({
        v_iPessoa: "7422928q",
        v_iPosicao: "1"
      })
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(400);
  });
});

describe('Teste da rota "/wsCivil/ObterAssinatura"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterAssinatura/7422928")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterAssinatura/7422928")
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterAssinatura/123110980")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });
  it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterAssinatura/12ww1")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(400);
  });
});


describe('Teste da rota "/wsCivil/ObterFoto3x4"', () => {
  it('Deve retornar o código 200 para requisição válida', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterFoto3x4/7422928")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Deve retornar o código 401 para credenciais inválidas', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterFoto3x4/7422928")
      .set('usuario', 'qwe')
      .set('senha', '123')
      .set('key', '123123');
    expect(response.status).toBe(401);
  });
  it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterFoto3x4/123110980")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(404);
  });
  it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
    const response = await request(app)
      .get("/wsCivil/ObterFoto3x4/12ww1")
      .set('usuario', headers.usuario)
      .set('senha', headers.senha)
      .set('key', headers.key);
    expect(response.status).toBe(400);
  });
});
