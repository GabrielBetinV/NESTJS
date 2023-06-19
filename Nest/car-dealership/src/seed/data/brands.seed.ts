import { v4 as uuid } from 'uuid';
import { Brand } from 'src/brands/entities/brand.entity';


// Esta constante tendra las datas de las marcas
export const BRAND_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Honda',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Jeep',
    createdAt: new Date().getTime(),
  },
];
