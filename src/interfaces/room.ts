export interface RangeCord3D {
  min: number;
  max: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Room {
  num: number;
  totalCoins: number;
  area: {
    x: RangeCord3D;
    y: RangeCord3D;
    z: RangeCord3D;
  };
  coins?: Point3D[];
  dateCoinsGenerated: Date;
}
