type SearchStatsProps = {
  amount: number;
};

function SearchStats({ amount }: SearchStatsProps) {
  return <h3>Found {amount} top results</h3>;
}

export default SearchStats;
