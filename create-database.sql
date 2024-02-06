-- drop schema curso cascade;

create schema curso;

create table curso.contas (
  conta_id uuid primary key,
  nome_completo text not null,
  usuario text not null,
  senha text not null,
  agencia text not null,
  numero_conta text not null,
  tipo_conta char not null,
  saldo double precision not null
);