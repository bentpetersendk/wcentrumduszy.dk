import { EditorialImage } from "@/components/system/EditorialImage";
import type { RichTextBlock } from "@/lib/content";

export function RichTextRenderer({ blocks }: { blocks: RichTextBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return <h2 key={index} className="pt-4 text-h2 text-text">{block.text}</h2>;
        }

        if (block.type === "paragraph") {
          return <p key={index} className="text-body text-text-muted">{block.text}</p>;
        }

        if (block.type === "quote") {
          return (
            <blockquote key={index} className="border-l border-clay pl-5 font-display text-[1.8rem] leading-snug text-text">
              {block.text}
            </blockquote>
          );
        }

        if (block.type === "callout") {
          return (
            <div key={index} className="rounded-md border border-border bg-mist/35 p-5 text-body text-text">
              {block.text}
            </div>
          );
        }

        if (block.type === "list") {
          const List = block.style === "numbered" ? "ol" : "ul";
          return (
            <List key={index} className={`space-y-2 text-body text-text-muted ${block.style === "numbered" ? "list-decimal" : "list-disc"} pl-6`}>
              {block.items.map((item) => <li key={item}>{item}</li>)}
            </List>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={index}>
              <EditorialImage src={block.src} alt={block.alt} aspect="wide" />
              {block.caption ? <figcaption className="mt-3 text-caption text-text-muted">{block.caption}</figcaption> : null}
            </figure>
          );
        }

        return (
          <div key={index} className="aspect-video rounded-md border border-border bg-surface p-6">
            <p className="text-caption uppercase text-text-muted">YouTube</p>
            <p className="mt-3 text-body text-text">{block.title}</p>
            <a className="mt-4 inline-block text-small text-text underline" href={block.url}>Open video</a>
          </div>
        );
      })}
    </div>
  );
}
