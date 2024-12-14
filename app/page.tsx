// @/app/page.tsx
"use client";

import { useState, useTransition } from "react";

import { Transfer } from "@/lib/transferBuilder";
import { processTransfer } from "@/actions/transfer";

export default function TransferPage() {
  const [result, setResult] = useState<Transfer | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as {
      fromAccount: string;
      toAccount: string;
      amount: string;
      currency: string;
      reference?: string;
      message?: string;
    };

    startTransition(async () => {
      try {
        const transfer = await processTransfer(data);
        setResult(transfer);
      } catch (error) {
        console.error("Error al procesar la transferencia:", error);
        setResult(null);
      }
    });
  };

  return (
    <main className="max-w-md mx-auto mt-8 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Realizar Transferencia</h1>
      <form action={handleSubmit} className="space-y-4">
        <input
          name="fromAccount"
          placeholder="Cuenta de origen"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="toAccount"
          placeholder="Cuenta destino"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Monto"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="currency"
          placeholder="Moneda"
          defaultValue="USD"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="reference"
          placeholder="Referencia (opcional)"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          placeholder="Mensaje (opcional)"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Procesando..." : "Enviar"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Resultado de la Transferencia</h2>
          <pre className="bg-white p-4 rounded-md overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}