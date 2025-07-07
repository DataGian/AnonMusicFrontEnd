import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Opcional: puedes poner rutas API aquí si deseas
  const pathname = new URL(request.url).pathname;
  if (pathname === '/api/hola') {
    return Response.json({ mensaje: 'Hola desde la API SSR Netlify' });
  }

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
