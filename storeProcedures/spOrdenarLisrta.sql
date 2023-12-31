USE [Warehouse]
GO
/****** Object:  StoredProcedure [dbo].[spOrdenarLista]    Script Date: 16/9/2023 06:13:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[spOrdenarLista]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT A.Codigo
		, A.Nombre
		,CA.Nombre as Clase
		, A.Precio
		From [dbo].[Articulo] A inner join ClaseArticulo CA --Consulta a la tabla Articulo
			on A.IdClaseArticulo = CA.id
		ORDER BY A.Nombre --Lo ordena por orden alfabetico

	SET NOCOUNT OFF;
END
