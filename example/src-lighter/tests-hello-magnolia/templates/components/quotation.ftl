[#if content.quotation?has_content]
<blockquote>
    ${cmsfn.decode(content).quotation}
    [#if content.citedPerson?has_content]<cite>${content.citedPerson}</cite>[/#if]
</blockquote>
[/#if]