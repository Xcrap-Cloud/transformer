import { transform, StringTransformer, StringValidator, TransformingModel } from "./src"

const data = [
  {
    "id": "1",
    "nome_produto": "Celular XYZ",
    "preco": "R$ 1.299,99",
    "quantidade_estoque": "50 unidades",
    "data_ultima_atualizacao": "2023-10-26 14:30:00",
    "fornecedor": "Tech Solutions LTDA.",
    "detalhes_adicionais": "Câmera de 48MP, 128GB de armazenamento. Cor: Azul. Frete Grátis."
  },
  {
    "id": "2",
    "nome_produto": "Notebook ABC",
    "preco": "2500,50",
    "quantidade_estoque": "vinte e cinco",
    "data_ultima_atualizacao": "2023/11/15",
    "fornecedor": "Informática Total",
    "detalhes_adicionais": "Processador i7, 8GB RAM. Sem sistema operacional."
  },
  {
    "id": "3",
    "nome_produto": "Monitor Gamer Ultra",
    "preco": "R$ 999,00",
    "quantidade_estoque": "10",
    "data_ultima_atualizacao": "2023-09-01 10:00AM",
    "fornecedor": "Gaming Gear SA",
    "detalhes_adicionais": "144Hz, 27 polegadas. Inclui cabo HDMI."
  },
  {
    "id": "4",
    "nome_produto": "Teclado Mecânico Pro",
    "preco": "R$ 350.00",
    "quantidade_estoque": "35",
    "data_ultima_atualizacao": "2023-12-01",
    "fornecedor": "Acessórios e Cia.",
    "detalhes_adicionais": "Switches Azuis. RGB customizável."
  },
  {
    "id": "5",
    "nome_produto": "Mouse Sem Fio Ergonomico",
    "preco": "75,99",
    "quantidade_estoque": "Setenta",
    "data_ultima_atualizacao": "2024-01-05 09:00:00",
    "fornecedor": "ErgoTech",
    "detalhes_adicionais": "Bateria de longa duração."
  },
  {
    "id": "6",
    "nome_produto": "HD Externo 1TB",
    "preco": "R$ 280,00",
    "quantidade_estoque": "15 unidades",
    "data_ultima_atualizacao": "Ontem",
    "fornecedor": "Data Storage Inc.",
    "detalhes_adicionais": "USB 3.0. Compatível com Windows e Mac."
  },
  {
    "id": "7",
    "nome_produto": "Webcam Full HD",
    "preco": "150",
    "quantidade_estoque": "20",
    "data_ultima_atualizacao": "2023-11-20",
    "fornecedor": "Video Connect LTDA.",
    "detalhes_adicionais": "Microfone embutido."
  },
  {
    "id": "8",
    "nome_produto": "Fone de Ouvido Bluetooth",
    "preco": "R$ 199.50",
    "quantidade_estoque": "40",
    "data_ultima_atualizacao": "2023-12-10 16:00",
    "fornecedor": "Audio Premium",
    "detalhes_adicionais": "Cancelamento de ruído. Bateria de 20h."
  },
  {
    "id": "9",
    "nome_produto": "Impressora Multifuncional",
    "preco": "R$ 800,00",
    "quantidade_estoque": "8",
    "data_ultima_atualizacao": "2024-01-01",
    "fornecedor": "Print Solutions",
    "detalhes_adicionais": "Copia, imprime, escaneia. Wi-Fi."
  },
  {
    "id": "10",
    "nome_produto": "Roteador Wi-Fi 6",
    "preco": "450,99",
    "quantidade_estoque": "12",
    "data_ultima_atualizacao": "2023-10-05 11:30:00",
    "fornecedor": "NetConnect",
    "detalhes_adicionais": "Dual band. 4 antenas."
  }
]


const transformingModel = new TransformingModel({
    products: {
        multiple: true,
        model: new TransformingModel({
            id: [
                transform({
                    key: "id",
                    transformer: StringTransformer.toNumber
                })
            ],
            name: [
                transform({
                    key: "nome_produto",
                    transformer: StringTransformer.raw
                })
            ],
            price: [
                transform({
                    key: "preco",
                    transformer: StringTransformer.raw,
                })
            ],
            stock: [
                transform({
                    key: "quantidade_estoque",
                    transformer: StringTransformer.toNumber
                })
            ],
            updatedAt: [
                transform({
                    key: "data_ultima_atualizacao",
                    transformer: StringTransformer.raw
                })
            ],
            supplier: [
                transform({
                    key: "fornecedor",
                    transformer: StringTransformer.raw
                })
            ],
            additionalDetails: [
                transform({
                    key: "detalhes_adicionais",
                    transformer: StringTransformer.raw
                })
            ]
        })
    }
})

;(async () => {
    const trasnformedData = await transformingModel.transform(data)
    console.log(trasnformedData)
})();