
import { TariffData, WelfareEffect, NashTariff } from './types';

export const PAPER_INFO = {
  title: "贸易战与产业政策竞争：解读美中经济冲突",
  originalTitle: "Trade wars and industrial policy competitions: Understanding the US-China economic conflicts",
  authors: "Jiandong Ju, Hong Ma, Zi Wang, Xiaodong Zhu",
  journal: "Journal of Monetary Economics 141 (2024)",
  doi: "10.1016/j.jmoneco.2023.10.012"
};

export const TARIFF_DATA: TariffData[] = [
  { industry: "农业 (Agriculture)", mfn_cn_us: 1.95, mfn_us_cn: 11.04, wave1_cn_us: 1.95, wave1_us_cn: 16.81, wave5_cn_us: 17.56, wave5_us_cn: 23.06, isMIC2025: false },
  { industry: "化学品 (Chemical)", mfn_cn_us: 3.17, mfn_us_cn: 7.91, wave1_cn_us: 4.79, wave1_us_cn: 8.01, wave5_cn_us: 28.65, wave5_us_cn: 22.35, isMIC2025: true },
  { industry: "计算机 (Computer)", mfn_cn_us: 1.90, mfn_us_cn: 7.74, wave1_cn_us: 10.66, wave1_us_cn: 7.74, wave5_cn_us: 25.14, wave5_us_cn: 17.54, isMIC2025: true },
  { industry: "电气设备 (Electrical equip.)", mfn_cn_us: 2.14, mfn_us_cn: 9.17, wave1_cn_us: 15.32, wave1_us_cn: 9.17, wave5_cn_us: 27.89, wave5_us_cn: 19.40, isMIC2025: true },
  { industry: "机械 (Machinery nec)", mfn_cn_us: 1.49, mfn_us_cn: 9.36, wave1_cn_us: 10.50, wave1_us_cn: 9.36, wave5_cn_us: 26.37, wave5_us_cn: 19.16, isMIC2025: true },
  { industry: "机动车 (Motor vehicles)", mfn_cn_us: 1.58, mfn_us_cn: 9.76, wave1_cn_us: 7.80, wave1_us_cn: 10.95, wave5_cn_us: 28.57, wave5_us_cn: 18.25, isMIC2025: true },
  { industry: "纺织品 (Textiles)", mfn_cn_us: 7.66, mfn_us_cn: 12.71, wave1_cn_us: 7.66, wave1_us_cn: 12.71, wave5_cn_us: 33.36, wave5_us_cn: 28.25, isMIC2025: false },
  { industry: "食品 (Food)", mfn_cn_us: 3.84, mfn_us_cn: 14.15, wave1_cn_us: 3.96, wave1_us_cn: 19.78, wave5_cn_us: 22.00, wave5_us_cn: 30.47, isMIC2025: false }
];

export const WELFARE_MIC_2025: WelfareEffect[] = [
  { entity: "中国", welfare: 2.47, final: -0.02, intermediate: -2.33, scale: 6.07, directTax: -1.26, micProd: 46.43 },
  { entity: "美国", welfare: 0.44, final: 0.88, intermediate: 0.38, scale: -0.84, directTax: 0.02, micProd: -12.56 },
  { entity: "欧盟", welfare: 0.10, final: 0.48, intermediate: 0.66, scale: -1.07, directTax: 0.03, micProd: -11.61 },
  { entity: "日本", welfare: -0.13, final: 0.58, intermediate: 0.65, scale: -1.35, directTax: -0.02, micProd: -16.92 },
  { entity: "印度", welfare: 0.66, final: 1.51, intermediate: 2.97, scale: -3.99, directTax: 0.17, micProd: -15.06 }
];

export const NASH_TARIFFS: NashTariff[] = [
  { scenario: "存在 MIC 2025", usTariff: 13.23, cnTariff: 20.42, usWelfare: -0.017, cnWelfare: -0.251 },
  { scenario: "不存在 MIC 2025", usTariff: 18.81, cnTariff: 27.77, usWelfare: -0.077, cnWelfare: -0.249 }
];
