// @/lib/transferBuilder.ts

export interface Transfer {
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  reference?: string;
  message?: string;
}

export class TransferBuilder {
  private transfer: Transfer;

  constructor() {
    this.transfer = {
      fromAccount: "",
      toAccount: "",
      amount: 0,
      currency: "USD", // Moneda predeterminada
    };
  }

  setFromAccount(account: string): this {
    this.transfer.fromAccount = account;
    return this;
  }

  setToAccount(account: string): this {
    this.transfer.toAccount = account;
    return this;
  }

  setAmount(amount: number): this {
    if (amount <= 0) {
      throw new Error("El monto debe ser mayor a 0");
    }
    this.transfer.amount = amount;
    return this;
  }

  setCurrency(currency: string): this {
    this.transfer.currency = currency;
    return this;
  }

  setReference(reference?: string): this {
    this.transfer.reference = reference;
    return this;
  }

  setMessage(message?: string): this {
    this.transfer.message = message;
    return this;
  }

  build(): Transfer {
    if (!this.transfer.fromAccount || !this.transfer.toAccount || this.transfer.amount <= 0) {
      throw new Error("Faltan campos obligatorios para la transferencia");
    }
    return this.transfer;
  }
}