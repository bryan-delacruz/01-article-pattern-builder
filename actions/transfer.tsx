// @/actions/transfer.tsx
"use server";

import { TransferBuilder } from "@/lib/transferBuilder";

export const processTransfer = async (data: {
  fromAccount: string;
  toAccount: string;
  amount: string;
  currency: string;
  reference?: string;
  message?: string;
}) => {

  // Agregamos un delay de 1000 milisegundos
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Construye la transferencia usando el Builder
  const transfer = new TransferBuilder()
    .setFromAccount(data.fromAccount)
    .setToAccount(data.toAccount)
    .setAmount(parseFloat(data.amount)) // Convierte el monto a número
    .setCurrency(data.currency)
    .setReference(data.reference)
    .setMessage(data.message)
    .build();

  return transfer;
}