import request from 'supertest';
import app from './app';
import headers from './testsConfig/config';

describe('Teste da rota "/wsCriminal/Autenticar"', () => {
    it('Deve retornar o código 200 para credenciais válidas', async () => {
        const response = await request(app)
            .post("/wsCriminal/Autenticar")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .post("/wsCriminal/Autenticar")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');

        expect(response.status).toBe(401);
    });
});

describe('Teste da rota "/wsCriminal/BuscarCidadaoNominal"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .post("/wsCriminal/BuscarCidadaoNominal")
            .send({
                v_sNome: "john silva"
            })
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .post("/wsCriminal/BuscarCidadaoNominal")
            .send({
                v_sNome: "john silva"
            })
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para RG nao encontrado', async () => {
        const response = await request(app)
            .post("/wsCriminal/BuscarCidadaoNominal")
            .send({
                v_sNome: "john silvaw"
            })
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });
});

describe('Teste da rota "/wsCriminal/BuscarCidadaoPorAlcunhas"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorAlcunhas/xola")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorAlcunhas/xola")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para RG nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorAlcunhas/xolao")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });
});

describe('Teste da rota "/wsCriminal/BuscarCidadaoPorCPF"', () => {
    // it('Deve retornar o código 200 para requisição válida', async () => {
    //     const response = await request(app)
    //         .get("/wsCriminal/BuscarCidadaoPorCPF/1234")
    //         .set('usuario', headers.usuario)
    //         .set('senha', headers.senha)
    //         .set('key', headers.key);

    //     expect(response.status).toBe(200); 
    //     expect(response.body).toHaveProperty('data');
    // });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorCPF/1234")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para CPF nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorCPF/1231")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });
    it('Deve retornar o código 400 para CPF Inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorCPF/dwe")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });    
});

describe('Teste da rota "/wsCriminal/BuscarCidadaoPorRC"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorRC/145174")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorRC/145174")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para RC nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorRC/1231123222")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });
    it('Deve retornar o código 400 para RC Inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/BuscarCidadaoPorRC/dwe")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });    
});

describe('Teste da rota "/wsCriminal/ObterDadosCriminais"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosCriminais/6854225")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosCriminais/6854225")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para Numero de Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosCriminais/6854225111")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });
    it('Deve retornar o código 400 para Numero de Pessoa Inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosCriminais/dwe")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });    
});

describe('Teste da rota "/wsCriminal/ObterDadosCidadao"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosCidadao/2036807")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosCidadao/2036807")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para Numero de Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosCidadao/2036807122")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });
    it('Deve retornar o código 400 para Numero de Pessoa Inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosCidadao/dwe")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });    
});

describe('Teste da rota "/wsCriminal/ObterAssinatura"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterAssinatura/7422928")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterAssinatura/7422928")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para Numero de Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterAssinatura/7422928111")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });
    it('Deve retornar o código 400 para Numero de Pessoa Inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterAssinatura/dwe")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });    
});

describe('Teste da rota "/wsCriminal/ObterDigitais"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .post("/wsCriminal/ObterDigitais")
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
            .post("/wsCriminal/ObterDigitais")
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
            .post("/wsCriminal/ObterDigitais")
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
            .post("/wsCriminal/ObterDigitais")
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

describe('Teste da rota "/wsCriminal/ObterFoto3x4"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterFoto3x4/7422928")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterFoto3x4/7422928")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterFoto3x4/123110980")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });    
    it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterFoto3x4/12ww1")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });       
});

describe('Teste da rota "/wsCriminal/ObterFoto3x4"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterFoto3x4/7422928")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterFoto3x4/7422928")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterFoto3x4/123110980")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });    
    it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterFoto3x4/12ww1")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });       
});

describe('Teste da rota "/wsCriminal/ObterDadosProcesso"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosProcesso/6854225")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosProcesso/6854225")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosProcesso/6854225222")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });    
    it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosProcesso/12ww1")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });       
});

describe('Teste da rota "/wsCriminal/ObterDadosOcorrencia"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosOcorrencia/6854225")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosOcorrencia/6854225")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosOcorrencia/6854225222")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });    
    it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosOcorrencia/12ww1")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });       
});


describe('Teste da rota "/wsCriminal/ObterDadosInquerito"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosInquerito/6854225")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosInquerito/6854225")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosInquerito/6854225222")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });    
    it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosInquerito/12ww1")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });       
});

describe('Teste da rota "/wsCriminal/ObterDadosInfracao"', () => {
    it('Deve retornar o código 200 para requisição válida', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosInfracao/6854225")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosInfracao/6854225")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosInfracao/6854225222")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });    
    it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosInfracao/12ww1")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });       
});

describe('Teste da rota "/wsCriminal/ObterDadosMandadoPrisao"', () => {
    // it('Deve retornar o código 200 para requisição válida', async () => {
    //     const response = await request(app)
    //         .get("/wsCriminal/ObterDadosMandadoPrisao/6854225")
    //         .set('usuario', headers.usuario)
    //         .set('senha', headers.senha)
    //         .set('key', headers.key);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('data');
    // });
    it('Deve retornar o código 401 para credenciais inválidas', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosMandadoPrisao/6854225")
            .set('usuario', 'qwe')
            .set('senha', '123')
            .set('key', '123123');
        expect(response.status).toBe(401);
    });
    it('Deve retornar o código 404 para id_Pessoa nao encontrado', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosMandadoPrisao/6854225222")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(404);
    });    
    it('Deve retornar o código 400 para id_Pessoa inválido', async () => {
        const response = await request(app)
            .get("/wsCriminal/ObterDadosMandadoPrisao/12ww1")
            .set('usuario', headers.usuario)
            .set('senha', headers.senha)
            .set('key', headers.key);
        expect(response.status).toBe(400);
    });       
});