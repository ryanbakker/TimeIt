import { Remarkable } from "remarkable";

const md = new Remarkable({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: "''",
});

export default function MarkdownPreview({ markdown }: { markdown: string }) {
  const renderedHTML = markdown
    ? md.render(markdown)
    : "<span>Start typing to see the preview...</span>";
  return <div dangerouslySetInnerHTML={{ __html: renderedHTML }} />;
}

export const markdownToHtml = async (
  markdownContent: string
): Promise<string> => {
  const md = new Remarkable();
  return md.render(markdownContent);
};
