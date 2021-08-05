export interface IRawMaterial {
  materialId?: string | any;
  supplier?: string | any;
  producerName: string | any;
  description: string | any;
  location: string | any;
  quantity: number | any;
  shipper: string | any;
  manufacturer: string | any;
  packageStatus?: string | number | any;
  transactionBlocks?: any[];
}
