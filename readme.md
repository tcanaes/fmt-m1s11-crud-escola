
### Criação do banco de dados
Cria o banco de dados informado no arquivo de configuração:
```
npx sequelize-cli db:create
```

### Criação das Tabelas
Criar o script de migration da tabela. 
Atenção, pois este comando não cria o arquivo de modelo automaticamente.
```
npx sequelize-cli migration:generate --name criar_tabela_<tabela>
```

Para criar os aquivos de modelo junto, usar o comando:
```
npx sequelize-cli model:generate --name <tabela> --attributes <campo>:string
```

Onde:
```
<tabela> = Nome da tabela que deseja criar
<campo>  = Nome de ao menos um dos campos que existirá na tabela
```

Para efetuar as operações no banco de dados, utilizar o comando para executar
os scripts da migration.
```
npx sequelize-cli db:migrate
```

Caso precise desfazer alguma coisa, usar o comando para desfazer o que foi
feito no comando acima.
```
npx sequelize-cli db:migrate:undo
```

# APIs

## Professores
### Criação
```
{
    "nome": "Nome completo do professor,
    "email": "email.do.professor@email.com",
    "nascimento": "AAAAMMDD",
    "telefone": "(00) 00000-0000"
}
```

## Cursos
### Criação
```
{
    "nome": "Estatistica Aplicada",
    "nível": "Avançado",
    "duracao": 200,
    "professorId": 1,
    "materiaId": 1
}
```    