export const ParsedText: FCC = function ParsedText({ children, className }) {
  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{ __html: children as string }}
      suppressHydrationWarning={true}
    />
  );
};
