export type TalentSchema = {
  name: string;
  talentIds: number[];
};

// that'd probably come from db as request response
export const talentSchema: TalentSchema[] = [
  {
    name: 'Talent Path 1',
    talentIds: [0, 1, 2, 3],
  },
  {
    name: 'Talent Path 2',
    talentIds: [4, 5, 6, 7],
  }
];
