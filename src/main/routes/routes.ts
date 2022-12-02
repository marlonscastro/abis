import { Controller } from "@/data/controllers/controller"
import { makeBuscaCidadaoNominalController, makeBuscaCidadaoNominalParametrizadaController, makeBuscaCidadaoRGController, makeBuscaRGController } from "@/main/factories/controllers/civil"
import { makeBuscaCidadaoNominalCriminalController, makeBuscaCidadaoNominalCriminalParametrizadaController } from "@/main/factories/controllers/criminal"

export type Route = {
  path: string
  handle: Controller
  middlewares?: [any]
}

export type Routes = {
  get?: Route[]
  post?: Route[]
}

export const routes: Routes = {
  get: [
    {
      path: '/wsCivil/BuscarPorRG/:v_iRG',
      handle: makeBuscaRGController()
    },
    {
      path: '/wsCivil/BuscarCidadaoPorRG/:v_iRG',
      handle: makeBuscaCidadaoRGController()
    },
    {
      path: '/wsCivil/BuscarCidadaoNominal',
      handle: makeBuscaCidadaoNominalController()
    },
    {
      path: '/wsCriminal/BuscarCidadaoNominal',
      handle: makeBuscaCidadaoNominalCriminalController()
    }
  ],
  post: [
    {
      path: '/wsCivil/BuscarCidadaoNominalParametrizada',
      handle: makeBuscaCidadaoNominalParametrizadaController()
    },
    {
      path: '/wsCriminal/BuscarCidadaoNominalParametrizada',
      handle: makeBuscaCidadaoNominalCriminalParametrizadaController()
    }
  ]
}



// routes.use('/wsCivil', authMiddleware);


// routes.get('/wsCivil/BuscarCidadaoPorCPF/:v_iCPF', wsCivilController.BuscarCidadaoPorCPF);
// routes.get('/wsCivil/ObterDadosCidadaoCivil/:v_iPessoa', wsCivilController.ObterDadosCidadaoCivil);
// routes.post('/wsCivil/ObterDocumentos', wsCivilController.ObterDocumentos);
// routes.post('/wsCivil/ObterDigitais', wsCivilController.ObterDigitais);
// routes.get('/wsCivil/ObterAssinatura/:v_iPessoa', wsCivilController.ObterAssinatura);
// routes.get('/wsCivil/ObterFoto3x4/:v_iPessoa', wsCivilController.ObterFoto3x4);

// // ###############################################################################################################
// // ######################################### ROTAS WS CRIMINAL  ##################################################
// // ###############################################################################################################
// routes.use('/wsCriminal', authMiddleware);
// routes.post('/wsCriminal/Autenticar', wsCriminalController.Autenticar);
// // routes.get('/wsCriminal/BuscarCidadaoNominal', wsCriminalController.BuscarCidadaoNominal);
// routes.get('/wsCriminal/BuscarCidadaoPorAlcunhas/:v_sApelido', wsCriminalController.BuscarCidadaoPorAlcunhas);

// // ####################### Aguardando CPF que retorne dados ###################################
// routes.get('/wsCriminal/BuscarCidadaoPorCPF/:v_iCPF', wsCriminalController.BuscarCidadaoPorCPF);
// // ############################################################################################

// routes.get('/wsCriminal/BuscarCidadaoPorRC/:v_iRC', wsCriminalController.BuscarCidadaoPorRC);
// routes.get('/wsCriminal/ObterDadosCriminais/:v_iNumeroPessoa', wsCriminalController.ObterDadosCriminais);
// routes.get('/wsCriminal/ObterDadosCidadao/:v_iPessoa', wsCriminalController.ObterDadosCidadao);
// routes.get('/wsCriminal/ObterAssinatura/:v_iPessoa', wsCriminalController.ObterAssinatura);
// routes.post('/wsCriminal/ObterDigitais', wsCivilController.ObterDigitais);
// routes.get('/wsCriminal/ObterFoto3x4/:v_iPessoa', wsCivilController.ObterFoto3x4);


// routes.get('/wsCriminal/ObterDadosProcesso/:v_iNumeroPessoa', wsCriminalController.ObterDadosProcesso);
// routes.get('/wsCriminal/ObterDadosOcorrencia/:v_iNumeroPessoa', wsCriminalController.ObterDadosOcorrencia);
// routes.get('/wsCriminal/ObterDadosInquerito/:v_iNumeroPessoa', wsCriminalController.ObterDadosInquerito);
// routes.get('/wsCriminal/ObterDadosInfracao/:v_iNumeroPessoa', wsCriminalController.ObterDadosInfracao);
// routes.get('/wsCriminal/ObterDadosMandadoPrisao/:v_iNumeroPessoa', wsCriminalController.ObterDadosMandadoPrisao);


// ###############################################################################################################
// ############################################  ROTAS WS CIVIL  #################################################
// ###############################################################################################################
// routes.use('/api', authMiddleware)
// routes.get('/api/civil/rg/:v_iRG', expressAdapter.create(makeBuscaRGController()));
/**
 * 
 * ------------------- CIVIL --------------------------- 
 * GET 
    * /api/civil/rg/{rg}
    * /api/civil/cpf/{cpf}
    * /api/civil/dados/{numero_pessoa}
    * /api/civil/assinatura/{numero_pessoa}
    * /api/civil/foto3x4/{numero_pessoa}
 * 
 * POST 
    * /api/civil/documentos
    * /api/civil/busca-nominal
    * /api/civil/digitais
 * 
 * ------------------ CRIMINAL -------------------------
 * GET
    * /api/criminal/busca-apelido
    * /api/criminal/cpf
    * /api/criminal/rc
    * /api/criminal/foto3x4/{numero_pessoa}
    * /api/criminal/processo/{numero_pessoa}
    * /api/criminal/ocorrencia/{numero_pessoa}
    * /api/criminal/inquerito/{numero_pessoa}
    * /api/criminal/infracao/{numero_pessoa}
    * /api/criminal/madado-prisao/{numero_pessoa}
 * 
 * POST
    * /api/criminal/busca-nominal
    * /api/criminal/digitais
 * 
 */