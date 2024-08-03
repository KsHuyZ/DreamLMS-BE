import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity({
  name: 'status',
})
export class StatusEntity extends EntityRelationalHelper {
  @ApiResponseProperty({
    type: String,
  })
  @PrimaryColumn('uuid')
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'active',
  })
  @Column()
  name?: string;
}
