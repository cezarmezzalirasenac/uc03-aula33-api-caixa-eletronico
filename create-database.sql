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
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  "deleted_at" timestamp
);

CREATE TABLE "banco"."contas" (
  "conta_id" uuid PRIMARY KEY,
  "pessoa_id" uuid NOT NULL,
  "agencia" text NOT NULL,
  "numero_conta" text NOT NULL,
  "tipo_conta" char NOT NULL,
  "saldo" double precision NOT NULL,
  "updated_at" timestamp NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "banco"."transacoes" (
  "transacao_id" uuid PRIMARY KEY,
  "conta_id" uuid NOT NULL,
  "tipo" char NOT NULL,
  "valor" double precision NOT NULL,
  "created_at" timestamp NOT NULL
);

ALTER TABLE "banco"."contas" ADD FOREIGN KEY ("pessoa_id") REFERENCES "banco"."pessoas" ("pessoa_id");

ALTER TABLE "banco"."transacoes" ADD FOREIGN KEY ("conta_id") REFERENCES "banco"."contas" ("conta_id");