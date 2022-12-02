var urlCivil = 'https://idnet.pe.gov.br/idNet.WebServices/Forms/wsCivil.asmx';
var urlCriminal = 'https://idnet.pe.gov.br/idNet.WebServices/Forms/wsCriminal.asmx';

var url = 'https://idnet.pe.gov.br/idNet.WebServices/Forms/';
const wsCivil = {
    Autenticar: {
        functionName: 'Autenticar',
        bodyRequired: [],
        type: 'data',
        responseBodyTag: null,
        error: 'Revise os dados de Login.',
        status: 401
    },    
    BuscarPorRG: {
        functionName: 'BuscarPorRG',
        bodyRequired: [
            'v_iRG'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'o RG informado é inválido',
        status: 400
    },
    BuscarCidadaoPorRG: {
        functionName: 'BuscarCidadaoPorRG',
        bodyRequired: [
            'v_iRG'
        ],
        type: 'data',
        responseBodyTag: 'DocumentElement',
        error: 'o RG informado é inválido',
        status: 400
    },
    BuscarCidadaoPorCPF: {
        functionName: 'BuscarCidadaoPorCPF',
        bodyRequired: [
            'v_iCPF'
        ],
        type: 'data',
        responseBodyTag: 'DocumentElement',
        error: 'o CPF informado é inválido',
        status: 400
    },    
    BuscarCidadaoNominal: {
        functionName: 'BuscarCidadaoNominal',
        bodyRequired: [
            'v_sNome'
        ],
        type: 'data',
        responseBodyTag: 'DocumentElement',
        error: 'os Dados informados são inválidos',
        status: 400
    },      
    ObterDadosCidadaoCivil: {
        functionName: 'ObterDadosCidadaoCivil',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Id de pessoa inválido',
        status: 400
    },     
    ObterDocumentos: {
        functionName: 'ObterDocumentos',
        bodyRequired: [
            'v_iPessoa',
            'v_sMnemonicoSubTipoImagem'
        ],
        type: 'both',
        responseBodyTag: 'DocumentElement',
        error: 'Id de pessoa ou Mnemonico inválidos',
        status: 400
    },    
    ObterAssinatura: {
        functionName: 'ObterAssinatura',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'image',
        responseBodyTag: 'DocumentElement',
        error: 'Id de pessoa inválido',
        status: 400
    },        
    ObterDigitais: {
        functionName: 'ObterDigitais',
        bodyRequired: [
            'v_iPessoa',
            'v_iPosicao'
        ],
        type: 'image',
        responseBodyTag: null,
        error: 'Exite algum dado inválido',
        status: 400
    },        
    ObterFoto3x4: {
        functionName: 'ObterFoto3x4',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'image',
        responseBodyTag: null,
        error: 'Id de pessoa inválido',
        status: 400
    },                
}


const wsCriminal = {
    Autenticar: {
        functionName: 'Autenticar',
        bodyRequired: [],
        type: 'data',
        responseBodyTag: null,
        error: 'Revise os dados de Login.',
        status: 401
    },    
    BuscarCidadaoPorRC: {
        functionName: 'BuscarCidadaoPorRC',
        bodyRequired: [
            'v_iRC'
        ],
        type: 'data',
        responseBodyTag: 'DocumentElement',
        error: 'O RG informado é inválido',
        status: 400
    },
    BuscarCidadaoPorCPF: {
        functionName: 'BuscarCidadaoPorCPF',
        bodyRequired: [
            'v_iCPF'
        ],
        type: 'data',
        responseBodyTag: 'DocumentElement',
        error: 'O CPF informado é inválido',
        status: 400
    },    
    BuscarCidadaoNominal: {
        functionName: 'BuscarCidadaoNominal',
        bodyRequired: [
            'v_sNome'
        ],
        type: 'data',
        responseBodyTag: 'DocumentElement',
        error: 'Os Dados informados são inválidos',
        status: 400
    },    
    ObterDadosCidadao: {
        functionName: 'ObterDadosCidadao',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Os Dados informados são inválidos',
        status: 400
    },  
    BuscarCidadaoPorAlcunhas: {
        functionName: 'BuscarCidadaoPorAlcunhas',
        bodyRequired: [
            'v_sApelido'
        ],
        type: 'data',
        responseBodyTag: 'DocumentElement',
        error: 'Os Dados informados são inválidos',
        status: 400
    }, 
    ObterDadosCidadaoCivil: {
        functionName: 'ObterDadosCidadaoCivil',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Id de pessoa inválido',
        status: 400
    },  
    ObterDadosCriminais: {
        functionName: 'ObterDadosCriminais',
        bodyRequired: [
            'v_iNumeroPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Os Dados informados são inválidos',
        status: 400
    },    
    ObterDocumentos: {
        functionName: 'ObterDocumentos',
        bodyRequired: [
            'v_iPessoa',
            'v_sMnemonicoSubTipoImagem'
        ],
        type: 'both',
        responseBodyTag: 'DocumentElement',
        error: 'Id de pessoa ou Mnemonico inválidos',
        status: 400
    },    
    ObterAssinatura: {
        functionName: 'ObterAssinatura',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'image',
        responseBodyTag: 'DocumentElement',
        error: 'Id de pessoa inválido',
        status: 400
    },        
    ObterDigitais: {
        functionName: 'ObterDigitais',
        bodyRequired: [
            'v_iPessoa',
            'v_iPosicao'
        ],
        type: 'image',
        responseBodyTag: null,
        error: 'Exite algum dado inválido',
        status: 400
    },        
    ObterFoto3x4: {
        functionName: 'ObterFoto3x4',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'image',
        responseBodyTag: null,
        error: 'Id de pessoa inválido',
        status: 400
    },     
    ObterFotoFrente: {
        functionName: 'ObterFotoFrente',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'image',
        responseBodyTag: null,
        error: 'Id de pessoa inválido',
        status: 400
    },           
    ObterFotoPerfilDireito: {
        functionName: 'ObterFotoPerfilDireito',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'image',
        responseBodyTag: null,
        error: 'Id de pessoa inválido',
        status: 400
    },  
    ObterFotoPerfilEsquerdo: {
        functionName: 'ObterFotoPerfilEsquerdo',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'image',
        responseBodyTag: null,
        error: 'Id de pessoa inválido',
        status: 400
    },  
    ObterFotoSinais: {
        functionName: 'ObterFotoSinais',
        bodyRequired: [
            'v_iPessoa'
        ],
        type: 'image',
        responseBodyTag: null,
        error: 'Id de pessoa inválido',
        status: 400
    },      
    ObterDadosProcesso: {
        functionName: 'ObterDadosProcesso',
        bodyRequired: [
            'v_iNumeroPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Os Dados informados são inválidos',
        status: 400
    },  
    ObterDadosOcorrencia: {
        functionName: 'ObterDadosOcorrencia',
        bodyRequired: [
            'v_iNumeroPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Os Dados informados são inválidos',
        status: 400
    },
    ObterDadosInquerito: {
        functionName: 'ObterDadosInquerito',
        bodyRequired: [
            'v_iNumeroPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Os Dados informados são inválidos',
        status: 400
    },    
    ObterDadosInfracao: {
        functionName: 'ObterDadosInfracao',
        bodyRequired: [
            'v_iNumeroPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Os Dados informados são inválidos',
        status: 400
    },    
    ObterDadosMandadoPrisao: {
        functionName: 'ObterDadosMandadoPrisao',
        bodyRequired: [
            'v_iNumeroPessoa'
        ],
        type: 'data',
        responseBodyTag: 'NewDataSet',
        error: 'Os Dados informados são inválidos',
        status: 400
    },    
}

export default {
    wsCivil,
    wsCriminal,
    url
};