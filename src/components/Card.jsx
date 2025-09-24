import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const DEFAULT_CARD_HEIGHT = 360;

const baseCardSx = {
  p: 2,
  width: "100%",
  height: DEFAULT_CARD_HEIGHT,
  bgcolor: "rgba(13,33,90,0.85)",
  color: "#fff",
  borderRadius: 2,
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  overflowX: "auto",
  // overflowY: "auto"
};

function computeGridSpans(columnCount, rawWidths) {
  const GRID_UNITS = 12;
  if (!columnCount || columnCount <= 0) return [GRID_UNITS];

  if (Array.isArray(rawWidths) && rawWidths.length === columnCount) {
    const positive = rawWidths.map((w) => (typeof w === "number" && w > 0 ? w : 1));
    const sum = positive.reduce((a, b) => a + b, 0);
    if (sum === 0) return Array.from({ length: columnCount }, () => Math.floor(GRID_UNITS / columnCount));

    const scaled = positive.map((w) => (w * GRID_UNITS) / sum);
    const floors = scaled.map((v) => Math.max(1, Math.floor(v)));
    let remainder = GRID_UNITS - floors.reduce((a, b) => a + b, 0);
    const fractional = scaled.map((v, i) => ({ i, frac: v - Math.floor(v) }));
    fractional.sort((a, b) => b.frac - a.frac);
    let idx = 0;
    while (remainder > 0 && idx < fractional.length) {
      floors[fractional[idx].i] += 1;
      remainder--;
      idx++;
    }
    return floors;
  }

  const base = Math.floor(GRID_UNITS / columnCount);
  const spans = Array.from({ length: columnCount }, () => Math.max(1, base));
  let remaining = GRID_UNITS - spans.reduce((a, b) => a + b, 0);
  let i = 0;
  while (remaining > 0) {
    spans[i % columnCount] += 1;
    remaining--;
    i++;
  }
  return spans;
}

export default function Card({ card }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { type, title } = card;

  const paperSx = { ...baseCardSx, height: card?.height || DEFAULT_CARD_HEIGHT };

  if (type === "blog") {
    return (
      <Paper elevation={0} sx={{ ...paperSx, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {card.content}
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (type === "table") {
    const headers = card.columnHeaders || [];
    const rows = card.rows || [];
    const columnCount = headers.length || (rows[0] ? rows[0].length : 0) || 1;

    const spans = computeGridSpans(columnCount, card.columnWidths);
    const totalUnits = spans.reduce((a, b) => a + b, 0);
    const adjustedWidths = spans.map((u) => `${(u / totalUnits) * 100}%`);

    const cellSx = {
      bgcolor: "rgba(255,255,255,0.06)",
      p: 1,
      borderBottom: "1px solid rgba(255,255,255,0.15)",
      textAlign: "center",
      borderRadius: 0
    };

    const headerCellSx = {
      ...cellSx,
      bgcolor: "rgba(255,255,255,0.12)",
      fontWeight: 600,
      borderBottom: "2px solid rgba(255,255,255,0.3)"
    };

    return (
      <Paper elevation={0} sx={paperSx}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <Box sx={{ display: "inline-block", minWidth: "100%" }}>
          <Box sx={{ display: "flex", width: "100%" }}>
            {headers.map((h, idx) => (
              <Box key={idx} sx={{ ...headerCellSx, flexBasis: adjustedWidths[idx], flexGrow: 1 }}>
                {h}
              </Box>
            ))}
          </Box>

          {rows.map((row, rIdx) => (
            <Box key={rIdx} sx={{ display: "flex", width: "100%" }}>
              {row.map((cell, cidx) => (
                <Box key={cidx} sx={{ ...cellSx, flexBasis: adjustedWidths[cidx], flexGrow: 1 }}>
                  {cell}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Paper>
    );
  }

  if (type === "chart") {
    const chartType = card.chartType || "bar";
    const labels = card.labels || [];
    const datasets = card.datasets || [];
    const data = { labels, datasets };
    const ChartComp =
      chartType === "line"
        ? Line
        : chartType === "pie"
        ? Pie
        : chartType === "doughnut"
        ? Doughnut
        : Bar;

    const chartSize = chartType === "pie" || chartType === "doughnut" ? 200 : 250;

    return (
      <Paper elevation={0} sx={paperSx}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Box sx={{ width: chartSize, height: chartSize, mx: "auto" }}>
          <ChartComp data={data} />
        </Box>
      </Paper>
    );
  }

  return null;
}
