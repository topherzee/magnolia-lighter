[#assign title = content.title!"Hello Magnolia :-)"]

<!DOCTYPE html>
<html>
   <head>
      <title>${title}</title>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Raleway:200" type="text/css">
      <link rel="stylesheet" href="${ctx.contextPath}/.resources/hello-magnolia/webresources/css/style.css">
      [@cms.page /]
   </head>
   <body>
      <div class="container">
         <header>
            <h1>${title}</h1>
            [#if content.introText?has_content]<p>${content.introText}</p>[/#if]
         </header>
          <div class="main">
          [@cms.area name="main"/]
          </div>
      </div>
   </body>
</html>