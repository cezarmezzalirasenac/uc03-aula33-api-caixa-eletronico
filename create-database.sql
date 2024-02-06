DROP TABLE IF EXISTS "curso"."transacoes";
DROP TABLE IF EXISTS "curso"."contas";
DROP TABLE IF EXISTS "curso"."pessoas";
DROP SCHEMA IF EXISTS "curso";

CREATE SCHEMA "curso";

CREATE TABLE "curso"."pessoas" (
  "pessoa_id" uuid PRIMARY KEY,
  "nome_completo" text NOT NULL,
  "cpf" text NOT NULL,
  "usuario" text NOT NULL,
  "senha" text NOT NULL
);

CREATE TABLE "curso"."contas" (
  "conta_id" uuid PRIMARY KEY,
  "pessoa_id" uuid NOT NULL,
  "agencia" text NOT NULL,
  "numero_conta" text NOT NULL,
  "tipo_conta" char NOT NULL,
  "saldo" double precision NOT NULL
);

CREATE TABLE "curso"."transacoes" (
  "transacao_id" uuid PRIMARY KEY,
  "conta_id" uuid NOT NULL,
  "tipo" char NOT NULL,
  "valor" double precision NOT NULL,
  "data_hora_transacao" timestamp
);

ALTER TABLE "curso"."contas" ADD FOREIGN KEY ("pessoa_id") REFERENCES "curso"."pessoas" ("pessoa_id");

ALTER TABLE "curso"."transacoes" ADD FOREIGN KEY ("conta_id") REFERENCES "curso"."contas" ("conta_id");
