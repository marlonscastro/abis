    "TipoApresentacao": "RC",
    "NumeroApresentacao": "397517",
    "NumeroPessoa": "7035480",
    "Nome": "Rafael Souto Raimundo Rafael Santos Raimundo",
    "NascimentoAproximado": "1988-04-04T00:00:00-03:00",
    "RC": "397517",
    "Mae": "Jussara Sueli Souto Raimundo Jussara Suely Souto Raimundo",
    "Pai": "Ricardo Bartolomeu Raimundo da Silva",
    "NumeroPedido": "9562133"
  

SELECT 
    I.nr_pedido as NUMEROPEDIDO,
    I.nr_unico_pessoa as NUMEROPESSOA,
    I.nm_ident as NOME,
    I.nm_pai_ident as PAI,
    I.nm_mae_ident as MAE,
    I.in_criminal as CRIMINAL,
    COUNT(*) OVER () as TOTAL
FROM IDT.MV_IDT_BUSCA I
WHERE 
    I.in_criminal = 1 AND 
    I.NM_IDENT_FONET LIKE ' RAFAYU  SOWTÖ  RA¥MUMDO %' AND 
    I.NM_MAE_IDENT_FONET LIKE ' JÖSARA %' AND 
    I.NM_PAI_IDENT_FONET LIKE ' R¥KARDO %' 
ORDER BY I.nr_pedido OFFSET 2*5 ROWS FETCH NEXT 5 ROWS ONLY


  {
	"v_sNome": {
		"value": "Marlon santos castro",
		"exata": true,
		"formato": 0
	},
	"v_sNomeMae": {
		"value": "Elizabeth",
		"exata": false,
		"formato": 1
	},	
	"v_sNomePai": {
		"value": "Marcondes",
		"exata": false,
		"formato": 1
	}
}


SELECT 
    IDT.FN_IDT_FONET('Moisés Marques') as NOME, 
    IDT.FN_IDT_FONET('Marli') as NOME_MAE, 
    IDT.FN_IDT_FONET('Jaime') as NOME_PAI I.NM_PAI_IDENT_FONET
FROM DUAL

-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

SELECT 
    I.*  
FROM IDT.IDT_IDENT I
WHERE 
    I.NM_IDENT_FONET  LIKE  '%MW¥ZYZ  MAR¢EZ%' AND
    I.NM_MAE_IDENT_FONET  LIKE  '% MARL¥ %' AND
    I.NM_PAI_IDENT_FONET  LIKE  '% JA¥ME %'

-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

SELECT      
    C.nr_rg_atrib as NUMEROAPRESENTACAO,
    C.nr_unico_pessoa as NUMEROPESSOA,
    I.nm_ident as NOME,
    I.nm_pai_ident as PAI,
    I.nm_mae_ident as MAE,
    I.nr_cpf as IDENTIFICACAO_CPF,
    I.dt_nasc_aprox as NASCIMENTOAPROXIMADO, 
    C.nr_rg_atrib as RGATRIBUIDO,
    I.nr_pedido as NUMEROPEDIDO
FROM IDT.IDT_IDENT I
INNER JOIN Idt.v_idt_info_cdadao C ON C.nr_pedido = I.nr_pedido
WHERE 
    I.NM_IDENT_FONET LIKE '% MW¥ZYZ  MAR¢EZ  KARWAL£O %' AND 
    I.NM_MAE_IDENT_FONET LIKE '% MARL¥ %' AND 
    I.NM_PAI_IDENT_FONET LIKE '% JA¥ME %'
    
-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

select 
    cidadao.*
from Idt.v_idt_info_cdadao cidadao 
where 
    cidadao.nr_rg_atrib = '7620643'

BOEPM usa 
    /wsCivil/BuscarPorRG/7457968                                           OK 
fluxo RG
    /wsCivil/BuscarCidadaoPorRG/7457968
    /wsCivil/ObterDadosCidadaoCivil/461659
    /wsCivil/ObterDocumentos
    /wsCivil/ObterFoto3x4/461659

fluxo CPF
    /wsCivil/BuscarCidadaoPorCPF/13701773483

fluxo Nominal 
    /wsCivil/BuscarCidadaoNominal?v_sNome=MOISES+MARQUES+DE+CARVALHO       OK



`/wsCivil/BuscarCidadaoPorRG/7620643`
[
{
    "TipoApresentacao": "RG",
    "NumeroApresentacao": "7620643",
    "NumeroPessoa": "610406",
    "Nome": "Jonas Gabriel Neves da Silva",
    "NascimentoAproximado": "1992-07-06T00:00:00-03:00",
    "RGAtribuido": "7620643",
    "Identificacao_CPF": "11030869448",
    "Mae": "Roseangela Maria das Neves Silva",
    "Pai": "João Maria da Silva",
    "NumeroPedido": "5380965"
}

]
`/wsCivil/BuscarCidadaoPorCPF/11030869448`
[
  {
    "TipoApresentacao": "RG",
    "NumeroApresentacao": "7620643",
    "NumeroPessoa": "610406",
    "Nome": "JONAS GABRIEL NEVES DA SILVA",
    "NascimentoAproximado": "06/07/1992",
    "RGAtribuido": "7620643",
    "Identificacao_CPF": "11030869448",
    "Mae": "ROSEANGELA MARIA DAS NEVES SILVA",
    "Pai": "JOÃO MARIA DA SILVA",
    "NumeroPedido": "5380965"
  }
]

`/wsCivil/ObterDadosCidadaoCivil/610406`
[
  {
    "NumeroPessoa": "610406",
    "RGAtribuido": "7620643",
    "RGDVAtribuido": "7620643",
    "Nome": "Jonas Gabriel Neves da Silva",
    "DescricaoSexo": "Masculino",
    "DataNascimentoAproximado": "1992-07-06T00:00:00-03:00",
    "Pai": "João Maria da Silva",
    "Mae": "Roseangela Maria das Neves Silva",
    "DescricaoGrauInstrucao": "2º Grau",
    "DescricaoEstadoCivil": "Solteiro",
    "SiglaUFNascimento": "PE",
    "NomeMunicipioNascimento": "Recife",
    "NomePaisNascimento": "Brasil",
    "DescricaoNacionalidade": "Brasileira",
    "NomePaisNacionalidade": "Brasil",
    "NomeProfissao": "Vendedor",
    "CPF": "11030869448",
    "DescricaoTipoMembro": "Mãos",
    "DataIdentificacao": "2014-08-13T09:56:23-03:00",
    "Enderecos": "Residencial - RUA DO CAJUEIRO,93,CAJUEIRO SECO-JABOATÃO-PE - A migrar/99 /  / ",
    "Telefones": "Telefone para contato - 3476-4133  / ",
    "Antropometrias": "Cabelos Cabelos Castanho Ondulado",
    "DocumentoApresentado": "CN.132057 L.113 F.169V CART.2°DIST.JABOATÃO PE 08.07.1992"
  }
]