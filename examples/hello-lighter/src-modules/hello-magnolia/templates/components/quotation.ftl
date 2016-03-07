[#if content.quotation?has_content]
<blockquote>
    <span data-mld-type='richTextField' data-mld-name='quotation'>${cmsfn.decode(content).quotation}</span>
    [#if content.citedPerson?has_content]<cite data-mld-name='citedPerson'>${content.citedPerson}</cite>[/#if]
</blockquote>
[/#if]
