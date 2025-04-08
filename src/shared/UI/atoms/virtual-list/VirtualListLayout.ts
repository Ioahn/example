import {
  LayoutNode,
  ListLayout,
  ListLayoutOptions,
} from '@react-stately/layout';
import {
  InvalidationContext,
  LayoutInfo,
  Rect,
} from '@react-stately/virtualizer';
import { Node } from 'react-stately';

type VirtualListLayoutOptions = ListLayoutOptions & {
  padding: number;
  placeholderHeight: number;
};

type ListBoxLayoutProps = {
  isLoadingTop: boolean;
  isLoadingBottom: boolean;
};

export class VirtualListLayout<T> extends ListLayout<T> {
  private placeholderHeight: number;
  private padding: number;
  private isLoadingTop: boolean = false;
  private isLoadingBottom: boolean = false;

  constructor(props: VirtualListLayoutOptions) {
    super(props);

    this.padding = props.padding;
    this.placeholderHeight = props.placeholderHeight;
  }

  update(invalidationContext: InvalidationContext<ListBoxLayoutProps>): void {
    this.isLoadingTop =
      invalidationContext.layoutOptions?.isLoadingTop || false;
    this.isLoadingBottom =
      invalidationContext.layoutOptions?.isLoadingBottom || false;

    super.update(invalidationContext);
  }

  protected buildCollection(): LayoutNode[] {
    const nodes = super.buildCollection(this.padding);
    let y = this.contentSize.height;

    if (this.isLoadingTop) {
      const rect = new Rect(0, y, this.virtualizer!.visibleRect.width, 40);
      const loadingTop = new LayoutInfo('loadingTop', 'loadingTop', rect);
      const node = {
        layoutInfo: loadingTop,
        validRect: loadingTop.rect,
      };
      nodes.unshift(node);
      this.layoutNodes.set(loadingTop.key, node);
      y = loadingTop.rect.maxY;
    }

    if (this.isLoadingBottom) {
      const rect = new Rect(0, y, this.virtualizer!.visibleRect.width, 40);
      const loadingBottom = new LayoutInfo(
        'loadingBottom',
        'loadingBottom',
        rect
      );
      const node = {
        layoutInfo: loadingBottom,
        validRect: loadingBottom.rect,
      };
      nodes.unshift(node);
      this.layoutNodes.set(loadingBottom.key, node);
      y = loadingBottom.rect.maxY;
    }

    if (nodes.length === 0) {
      const rect = new Rect(
        0,
        y,
        this.virtualizer!.visibleRect.width,
        this.placeholderHeight ?? this.virtualizer!.visibleRect.height
      );
      const placeholder = new LayoutInfo('placeholder', 'placeholder', rect);
      const node = {
        layoutInfo: placeholder,
        validRect: placeholder.rect,
      };
      nodes.push(node);
      this.layoutNodes.set(placeholder.key, node);
      y = placeholder.rect.maxY;
    }

    this.contentSize.height = y + this.padding;

    return nodes;
  }

  protected buildSection(node: Node<T>, x: number, y: number): LayoutNode {
    // Synthesize a collection node for the header.
    const headerNode = {
      type: 'header',
      key: node.key + ':header',
      parentKey: node.key,
      value: null,
      level: node.level,
      index: node.index,
      hasChildNodes: false,
      childNodes: [],
      rendered: node.rendered,
      textValue: node.textValue,
    };

    // Build layout node for it and adjust y offset of section children.
    const header = this.buildSectionHeader(headerNode, x, y);
    header.node = headerNode;
    header.layoutInfo.parentKey = node.key;
    this.layoutNodes.set(headerNode.key, header);
    y += header.layoutInfo.rect.height;

    const section = super.buildSection(node, x, y);
    section.children?.unshift(header);

    return section;
  }
}
