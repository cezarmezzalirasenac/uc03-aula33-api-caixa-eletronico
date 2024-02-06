DROP TABLE IF EXISTS "banco"."transacoes";
DROP TABLE IF EXISTS "banco"."contas";
DROP TABLE IF EXISTS "banco"."pessoas";
DROP SCHEMA IF EXISTS "banco";

CREATE SCHEMA "banco";

CREATE TABLE "banco"."pessoas" (
  "pessoa_id" uuid PRIMARY KEY,
  "nome_completo" text NOT NULL,
  "cpf" text NOT NULL,
  "usuario" text NOT NULL,
  "senha" text NOT NULL,
  "privilegio" text NOT NULL DEFAULT 'sem-acesso',
  "data_exclusao" timestamp
);

CREATE TABLE "banco"."contas" (
  "conta_id" uuid PRIMARY KEY,
  "pessoa_id" uuid NOT NULL,
  "agencia" text NOT NULL,
  "numero_conta" text NOT NULL,
  "tipo_conta" char NOT NULL,
  "saldo" double precision NOT NULL
);

CREATE TABLE "banco"."transacoes" (
  "transacao_id" uuid PRIMARY KEY,
  "conta_id" uuid NOT NULL,
  "tipo" char NOT NULL,
  "valor" double precision NOT NULL,
  "data_hora_transacao" timestamp
);

ALTER TABLE "banco"."contas" ADD FOREIGN KEY ("pessoa_id") REFERENCES "banco"."pessoas" ("pessoa_id");

ALTER TABLE "banco"."transacoes" ADD FOREIGN KEY ("conta_id") REFERENCES "banco"."contas" ("conta_id");
