import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Operation } from "@/types";
import {
  operationSchema,
  type OperationFormData,
} from "../../schemas/operationSchema";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

interface OperationFormProps {
  onAddOperation: (operation: Omit<Operation, "id" | "createdAt">) => void;
}

export function OperationForm({ onAddOperation }: OperationFormProps) {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<OperationFormData>({
    resolver: zodResolver(operationSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      type: "buy",
      stockSymbol: "",
      price: 0,
      quantity: 0,
      brokerageFee: 0,
    },
  });

  const onSubmit = (data: OperationFormData) => {
    onAddOperation(data);
    reset({
      date: new Date().toISOString().split("T")[0],
      type: "buy",
      stockSymbol: "",
      price: 0,
      quantity: 0,
      brokerageFee: 0,
    });
  };

  return (
    <div className="py-8 px-0 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Nova Operação</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray mb-2">Data da Operação *</label>
            <input
              type="date"
              {...register("date")}
              className={`w-full p-3 rounded border bg-white ${
                errors.date ? "border-2" : "border"
              }`}
            />
            {errors.date && <FormErrorMessage message={errors.date.message} />}
          </div>

          <div>
            <label className="block text-gray mb-2">Tipo de Operação *</label>
            <select
              {...register("type")}
              className={`w-full p-3 rounded border bg-white ${
                errors.type ? "border-2" : "border"
              }`}
            >
              <option value="buy">Compra</option>
              <option value="sell">Venda</option>
            </select>
            {errors.type && <FormErrorMessage message={errors.type.message} />}
          </div>
        </div>

        <div>
          <label className="block text-gray mb-2">Símbolo da Ação *</label>
          <input
            type="text"
            placeholder="Ex: PETR4, VALE3, ITUB4"
            {...register("stockSymbol")}
            className={`w-full p-3 rounded border bg-white ${
              errors.stockSymbol ? "border-2" : "border"
            }`}
          />
          {errors.stockSymbol && (
            <FormErrorMessage message={errors.stockSymbol.message} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray mb-2">Preço (R$) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price", { valueAsNumber: true })}
              className={`w-full p-3 rounded border bg-white ${
                errors.price ? "border-2" : "border"
              }`}
            />
            {errors.price && (
              <FormErrorMessage message={errors.price.message} />
            )}
          </div>

          <div>
            <label className="block text-gray mb-2">Quantidade *</label>
            <input
              type="number"
              min="1"
              placeholder="100"
              {...register("quantity", { valueAsNumber: true })}
              className="w-full p-3 rounded border bg-white"
            />
            {errors.quantity && (
              <FormErrorMessage message={errors.quantity.message} />
            )}
          </div>

          <div>
            <label className="block text-gray mb-2">
              Taxa de Corretagem (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="8.50"
              {...register("brokerageFee", { valueAsNumber: true })}
              className={`w-full p-3 rounded border bg-white  ${
                errors.brokerageFee ? "border-2" : "border"
              }`}
            />
            {errors.brokerageFee && (
              <FormErrorMessage message={errors.brokerageFee.message} />
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full bg-purple mt-4 px-6 py-3 rounded text-white font-bold text-lg transition-colors duration-200 hover:opacity-90 hover:bg-purple-dark disabled:pointer-events: none"
        >
          Adicionar Operação
        </button>
      </form>
    </div>
  );
}
