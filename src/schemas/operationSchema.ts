import { z } from "zod";

export const operationSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  type: z.enum(["buy", "sell"]),
  stockSymbol: z
    .string()
    .min(1, "Símbolo da ação é obrigatório")
    .transform((val) => val.toUpperCase().trim()),
  price: z
    .number({ message: "Preço deve ser um número" })
    .positive("Preço deve ser maior que zero"),
  quantity: z
    .number({ message: "Quantidade deve ser um número" })
    .int("Quantidade deve ser um número inteiro")
    .positive("Quantidade deve ser maior que zero"),
  brokerageFee: z
    .number({ message: "Taxa de corretagem deve ser um número" })
    .min(0, "Taxa de corretagem deve ser maior ou igual a zero"),
});

export type OperationFormData = z.infer<typeof operationSchema>;
