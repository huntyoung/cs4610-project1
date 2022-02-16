import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class addProject1644947730770 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'project',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                  name: 'name',
                  type: 'text',
                  isNullable: false,
                },
                {
                    name: 'creatorId',
                    type: 'int', 
                }
              ],
            }),
          );
      
          await queryRunner.createTable(
            new Table({
              name: 'user_project',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                  name: 'userId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'projectId',
                  type: 'int',
                  isNullable: false,
                },
              ],
            }),
          );

          await queryRunner.createTable(
            new Table({
              name: 'task',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                    name: 'completed',
                    type: 'boolean',
                },
                {
                    name: 'projectId',
                    type: 'int'
                },
                {
                    name: 'userId',
                    type: 'int'
                },
                {
                    name: 'description',
                    type: 'text'
                },
                {
                    name: 'timeEstimation',
                    type: 'int'
                },
                {
                    name: 'title',
                    type: 'text'
                },
              ],
            }),
          );
      
          await queryRunner.createForeignKey(
            'user_project',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
          );
      
          await queryRunner.createForeignKey(
            'user_project',
            new TableForeignKey({
              columnNames: ['projectId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
          );

          await queryRunner.createForeignKey(
            'task',
            new TableForeignKey({
              columnNames: ['projectId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
          );

          await queryRunner.createForeignKey(
            'task',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task');
        await queryRunner.dropTable('user_project');
        await queryRunner.dropTable('project');
    }

}
