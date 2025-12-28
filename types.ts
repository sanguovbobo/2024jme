
export interface TariffData {
  industry: string;
  mfn_cn_us: number;
  mfn_us_cn: number;
  wave1_cn_us: number;
  wave1_us_cn: number;
  wave5_cn_us: number;
  wave5_us_cn: number;
  isMIC2025: boolean;
}

export interface WelfareEffect {
  entity: string;
  welfare: number;
  final: number;
  intermediate: number;
  scale: number;
  directTax: number;
  micProd: number;
}

export interface NashTariff {
  scenario: string;
  usTariff: number;
  cnTariff: number;
  usWelfare: number;
  cnWelfare: number;
}
